import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-lg-5 bg-blue">
          <Sidebar/>
        </div>
        <div className="col-lg-7">
          <div class="row form-container">
            <div className="col-md-12 col-lg-7 mx-auto">
            <h1>Register</h1>
            <form>
              <div class="form-group">
                <label htmlFor="name">Nom</label>
                <input class="form-control" />
              </div>
              <div class="form-group">
                <label htmlFor="name">Email</label>
                <input class="form-control" />
              </div>
              <div class="form-group">
                <label htmlFor="name">Numéro de téléphone</label>
                <input class="form-control" />
              </div>
              <div class="form-group">
                <label htmlFor="name">Mot de passe</label>
                <input class="form-control" />
              </div>
              <div class="form-group">
                <label htmlFor="name">Mot de passe (confirmation)</label>
                <input class="form-control" />
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customSwitch1" checked="" />
                <label className="custom-control-label" for="customSwitch1">J'accepte <a href="#" _target="blanl">les conditions d'utilisations</a></label>
              </div>
              <div className="form-group mt-4">
                <button className="btn btn-light-primary px-4">Créer mon compte</button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
