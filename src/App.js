import JoinElements from "./components/elements/JoinElements";

function App() {
  return (
    <div>
      <JoinElements separator={<hr />}>
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </JoinElements>
    </div>
  );
}

export default App;
