import Aside from "./components/Aside";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Le nom est obligatoire"),
  email: Yup.string().required("L'adresse e-mail est obligatoire")
          .email("Veuillez une adresse e-mail valide"),
  password: Yup.string().required("Le mot de passe est obligatoire")
              .min(6, "Le mot de passe doit avoir 6 caractères"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
  phoneNumber: Yup.number().typeError("Veuillez entrer un numero de téléphoe valide")
                .required("Le numero de téléphone est obligatoire"),
  gcu: Yup.boolean().oneOf([true], "Veuillez accepter les conditions d'utilisation")
})


function App() {
  const initialValues =  {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
    gcu: false
  };

  function handleSubmit(formValues) {
    console.log("Form values", formValues)
  }
  

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
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {
                  formik => (
                    <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Nom</label>
                      <input className="form-control" id="name" name="name" type="text"
                        { ...formik.getFieldProps("name") }
                      />
                      {
                        formik.errors.name && formik.touched.name &&
                        <span className="text-danger">{formik.errors.name}</span>
                      }
                    </div> 
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input className="form-control"id="email" name="email" type="email"
                      { ...formik.getFieldProps("email") }
                      />
                      {
                        formik.errors.email && formik.touched.email &&
                        <span className="text-danger">{formik.errors.email}</span>
                      }
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Numéro de téléphone</label>
                      <input className="form-control" type="text" name="phoneNumber" id="phoneNumber"
                      { ...formik.getFieldProps("phoneNumber") }
                      />
                      {
                        formik.errors.phoneNumber && formik.touched.phoneNumber &&
                        <span className="text-danger">{formik.errors.phoneNumber}</span>
                      }
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Mot de passe</label>
                      <input className="form-control" type="password" name="password" id="password"
                        { ...formik.getFieldProps("password") }
                      />
                      {
                        formik.errors.password && formik.touched.password &&
                        <span className="text-danger">{formik.errors.password}</span>
                      }
                    </div>
                    <div className="form-group">
                      <label htmlFor="passwordConfirmation">Mot de passe (confirmation)</label>
                      <input className="form-control" type="password" name="passwordConfirmation" id="passwordConfirmation"
                      { ...formik.getFieldProps("passwordConfirmation") }
                      />
                      {
                        formik.errors.passwordConfirmation && formik.touched.passwordConfirmation &&
                        <span className="text-danger">{formik.errors.passwordConfirmation}</span>
                      }
                    </div>
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="gcu"
                        { ...formik.getFieldProps({ name: "gcu", checked: false }) }
                      />
                      <label className="custom-control-label" htmlFor="gcu">J'accepte <a href="#" _target="blank">les conditions d'utilisation</a></label>
                      {
                        formik.errors.gcu && formik.touched.gcu &&
                        <span className="text-danger d-block">{formik.errors.gcu}</span>
                      }
                    </div>
                    <div className="form-group mt-4">
                      <button className="btn btn-light-primary px-4">Créer mon compte</button>
                    </div>
                  </form>
                  )
                }
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
