import './App.css';

function App() {
  return (
    <div>
      <h1 className="Title">
        Culture Quizz
      </h1>
      <p className="Textpresentation">
        Bienvenue sur Culture Quizz, le site qui vous permet de tester vos connaissances sur la culture générale.
      </p>
      <h1 className='TitleCategory'>
        Liste des catégories
          <div className='Category'>
            <div className='Option'>
              <a className='Theme' href='./theme0'>
                Histoire
              </a>
            </div>
            <div className='Option'>
              <a className='Theme' href='./theme0'>
                Sport
              </a>
            </div>
          </div>
      </h1>
    </div>
  );
}

export default App;
