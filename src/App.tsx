import React from "react";
import "./App.css";

const App = () => {
  const [userIdValue, setUserIdValue] = React.useState("1");
  const [result, setResult] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isFetching, setIsFetching] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  const fetchUserInfo = () => {
    fetch(`https://reqres.in/api/users/${userIdValue}?delay=5`)
      .then(response =>
        response.status === 200
          ? Promise.resolve(response.json())
          : Promise.reject(response.status)
      )
      .then(data => {
        setIsSuccessful(true);
        setResult(JSON.stringify(data, undefined, 2));
      })
      .catch(err => {
        setIsSuccessful(false);
        setErrorMessage(`Request failed. Error: ${err}`);
      })
      .then(() => {
        setIsFetching(false);
      });
  };
  const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIdValue(event.target.value);
  };

  const onFetchClicked = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSuccessful(false);
    setIsFetching(true);
    fetchUserInfo();
  };

  return (
    <div className="App">
      <form noValidate autoComplete="off">
        <label>
          Enter User ID (1-12)
          <input
            type="text"
            id="userId"
            name="userId"
            required
            onChange={onValueChanged}
            value={userIdValue}
            disabled={isFetching}
          />
        </label>
        <input
          type="submit"
          value="Fetch"
          onClick={onFetchClicked}
          disabled={isFetching}
        />
        {isFetching && (
            <label className="status">Fetching data. Please wait (max wait: 5 seconds)...</label>
        )}
        {!isSuccessful && errorMessage.length > 0 && (
          <label className="error">{errorMessage}</label>
        )}
      </form>
      {isSuccessful && (
        <div className="result">
          <h2>Result</h2>

          <pre>
            <code>{result}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
