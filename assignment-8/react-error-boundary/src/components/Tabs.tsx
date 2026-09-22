import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  registerTab: (value: string, disabled: boolean) => void;
  unregisterTab: (value: string) => void;
  tabs: string[];
  getTabId: (value: string) => string;
  getPanelId: (value: string) => string;
}

const TabsContext =
  createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(
      "Tabs components must be used inside <Tabs>"
    );
  }

  return context;
}

function Tabs({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
}: TabsProps) {
  const [internalValue, setInternalValue] =
    useState(defaultValue ?? "");

  const [tabs, setTabs] = useState<string[]>([]);

  const baseId = useId();

  const isControlled =
    controlledValue !== undefined;

  const value = isControlled
    ? controlledValue
    : internalValue;

  const setValue = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }

    onValueChange?.(newValue);
  };

  const registerTab = (
    tabValue: string,
    _disabled: boolean
  ) => {
    setTabs((current) => {
      if (current.includes(tabValue)) {
        return current;
      }

      return [...current, tabValue];
    });
  };

  const unregisterTab = (tabValue: string) => {
    setTabs((current) =>
      current.filter((value) => value !== tabValue)
    );
  };

  const getTabId = (tabValue: string) =>
    `${baseId}-tab-${tabValue}`;

  const getPanelId = (tabValue: string) =>
    `${baseId}-panel-${tabValue}`;

  return (
    <TabsContext.Provider
      value={{
        value,
        setValue,
        registerTab,
        unregisterTab,
        tabs,
        getTabId,
        getPanelId,
      }}
    >
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
}

function TabsList({
  children,
}: TabsListProps) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

function TabsTrigger({
  value,
  children,
  disabled = false,
}: TabsTriggerProps) {
  const {
    value: activeValue,
    setValue,
    registerTab,
    unregisterTab,
    tabs,
    getTabId,
    getPanelId,
  } = useTabsContext();

  useEffect(() => {
    registerTab(value, disabled);

    return () => {
      unregisterTab(value);
    };
  }, [value, disabled]);

  const isActive = activeValue === value;

  const moveFocus = (index: number) => {
    const nextValue = tabs[index];

    if (!nextValue) {
      return;
    }

    setValue(nextValue);

    requestAnimationFrame(() => {
      document
        .getElementById(getTabId(nextValue))
        ?.focus();
    });
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>
  ) => {
    if (tabs.length === 0) {
      return;
    }

    const currentIndex = tabs.indexOf(value);

    switch (event.key) {
      case "ArrowRight": {
        event.preventDefault();

        const nextIndex =
          (currentIndex + 1) % tabs.length;

        moveFocus(nextIndex);
        break;
      }

      case "ArrowLeft": {
        event.preventDefault();

        const previousIndex =
          (currentIndex - 1 + tabs.length) %
          tabs.length;

        moveFocus(previousIndex);
        break;
      }

      case "Home": {
        event.preventDefault();
        moveFocus(0);
        break;
      }

      case "End": {
        event.preventDefault();
        moveFocus(tabs.length - 1);
        break;
      }

      case "Enter":
      case " ": {
        event.preventDefault();
        setValue(value);
        break;
      }
    }
  };

  return (
    <button
      id={getTabId(value)}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={getPanelId(value)}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
}

interface TabsPanelProps {
  value: string;
  children: ReactNode;
}

function TabsPanel({
  value,
  children,
}: TabsPanelProps) {
  const {
    value: activeValue,
    getTabId,
    getPanelId,
  } = useTabsContext();

  const isActive = activeValue === value;

  if (!isActive) {
    return null;
  }

  return (
    <div
      id={getPanelId(value)}
      role="tabpanel"
      aria-labelledby={getTabId(value)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

interface TabsComponent {
  (props: TabsProps): React.ReactElement;
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Panel: typeof TabsPanel;
}

const TabsWithCompoundComponents =
  Tabs as TabsComponent;

TabsWithCompoundComponents.List = TabsList;
TabsWithCompoundComponents.Trigger = TabsTrigger;
TabsWithCompoundComponents.Panel = TabsPanel;

export default TabsWithCompoundComponents;