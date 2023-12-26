import './App.css';

import myhook from './components/useMyHook';

function App(props) {

  const [myHook, setMyHook] = myhook();

  return (
    <>
      <div>
        {myHook}
        <button onClick={() => setMyHook(myHook + 1)}>Increment</button>
      </div>
    </>
  );
}

export default App;