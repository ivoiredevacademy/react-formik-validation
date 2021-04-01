import Aside from "./components/Aside";
import { useFormik } from "formik";


function App() {
  const initialValues =   {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phoneNumber: "",
    gcu: false
  }

  function createUser(values) {
    console.log("Form submitted... OK");
  }

  function validate(formValues) {
    const errors =  {};

    if(formValues.name === "") {
      errors.name = "Le champ nom est obligatoire"
    }

    if(formValues.email === "")  {
      errors.email = "Le champ email est obligatoire"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)){
      errors.email = "Veuillez entrer une adresse e-mail valide";
    }

    if(formValues.password === "")  {
      errors.password = "Le mot de passe est obligatoire"
    } else if(formValues.password.length < 8) {
      errors.password = "Le mot de passe doit avoir au moins 8 caractères";
    }

    if(formValues.phoneNumber === "")  {
      errors.phoneNumber = "Le numero de téléphone est obligatoire"
    } else if(! /^\d+$/.test(formValues.phoneNumber)) {
      errors.phoneNumber = "Veuillez entrer un numero de téléphone valide";
    }

    if(formValues.password !== formValues.passwordConfirmation) {
      errors.passwordConfirmation = "Les mots de passe ne correspondent pas";
    }

    if(! formValues.gcu) {
      errors.gcu = "Veuillez accepter les conditions d'utilisation"
    }


    return errors;
  }


  const formik = useFormik({
    initialValues,
    onSubmit: createUser,
    validate
  });

  const { name, email, phoneNumber, gcu, passwordConfirmation, password} = formik.values;
  const { handleChange, handleBlur } = formik



  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-lg-5 bg-blue">
          <Aside/>
        </div>
        <div className="col-lg-7">
          <div className="row form-container">
            <div className="col-md-12 col-lg-7 mx-auto">
            <h1>Inscription</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input className="form-control" id="name" name="name" type="text" 
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  formik.errors.name && formik.touched.name && <span className="text-danger">{ formik.errors.name }</span>
                }
              </div> 
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input className="form-control"id="email" name="email" type="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  formik.errors.email && formik.touched.email && <span className="text-danger">{ formik.errors.email }</span>
                }
              </div>
              <div className="form-group">
                <label htmlFor="name">Numéro de téléphone</label>
                <input className="form-control" type="text" name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {
                  formik.errors.phoneNumber && formik.touched.phoneNumber && <span className="text-danger">{ formik.errors.phoneNumber }</span>
                }
              </div>
              <div className="form-group">
                <label htmlFor="name">Mot de passe</label>
                <input className="form-control" type="password" name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  formik.errors.password && formik.touched.password && <span className="text-danger">{ formik.errors.password }</span>
                }
              </div>
              <div className="form-group">
                <label htmlFor="name">Mot de passe (confirmation)</label>
                <input className="form-control" type="password" name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {
                  formik.errors.passwordConfirmation && formik.touched.passwordConfirmation && <span className="text-danger">{ formik.errors.passwordConfirmation }</span>
                }
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="gcu" checked={gcu}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className="custom-control-label" htmlFor="gcu">J'accepte <a href="#" _target="blank">les conditions d'utilisation</a></label>
                {
                  formik.errors.gcu && formik.touched.gcu && <span className="text-danger d-block">{ formik.errors.gcu }</span>
                }
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
