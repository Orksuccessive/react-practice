import Tabs from "./components/Tabs";

function App() {
  return (
    <Tabs defaultValue="a">
      <Tabs.List>
        <Tabs.Trigger value="a">
          Tab A
        </Tabs.Trigger>

        <Tabs.Trigger value="b">
          Tab B
        </Tabs.Trigger>

        <Tabs.Trigger value="c">
          Tab C
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Panel value="a">
        <h2>Panel A</h2>
        <p>This is panel A.</p>
      </Tabs.Panel>

      <Tabs.Panel value="b">
        <h2>Panel B</h2>
        <p>This is panel B.</p>
      </Tabs.Panel>

      <Tabs.Panel value="c">
        <h2>Panel C</h2>
        <p>This is panel C.</p>
      </Tabs.Panel>
    </Tabs>
  );
}

export default App;