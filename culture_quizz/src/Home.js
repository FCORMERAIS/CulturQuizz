import './App.css';

function App() {

  // fonction pour ajouter automatiquement des category
  // const addCategory = () => {
  //   let i = 2;
  //   let category = document.createElement('div');
  //   category.className = 'Category';
  //   let option = document.createElement('div');
  //   option.className = 'Option';
  //   let themes = {
  //     0: 'Histoire',
  //     1: 'Géographie',
  //     2: 'Sport',
  //     3: 'Musique',
  //     4: 'Cinéma',
  //     5: 'Littérature',
  //     6: 'Sciences',
  //     7: 'Art',
  //     8: 'Histoire',
  //   }
  //   let theme = document.createElement('a');
  //   theme.className = 'Theme';
  //   theme.href = './theme' + i;
  //   theme.innerHTML = themes[i];
  //   option.appendChild(theme);
  //   category.appendChild(option);
  //   document.body.appendChild(category);
  // }
  // addCategory()
  
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
