import Aside from "./components/Aside";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function emailAsyncValidation(email) {

  return new Promise((resolve, reject) =>  {

    setTimeout(() => {
      if(email === "juvenal@ivoiredevacademy.com") {
        reject(false)
      } else {
        resolve(true)
      }
    }, 1000)
  })
}

function formAsyncSubmission(formValues) {
  return new Promise((resolve, reject) =>  {
    setTimeout(() => {
      reject("Form submitted");
    }, 2000)
  })
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Le nom est obligatoire"),
  email: Yup.string().required("L'adresse e-mail est obligatoire")
          .email("Veuillez une adresse e-mail valide")
          .test("checkUniqueEmail", "Cette adresse e-mail est déjà utilisé", async (value) =>  {
            let isUnique = false;

            try {
                isUnique = await emailAsyncValidation(value);
            } catch(error) {
                console.error(error)
            }

            return isUnique
          }),
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

  async function handleSubmit(formValues, onSubmittingProps) {
    try {
      await formAsyncSubmission(formValues);
      onSubmittingProps.resetForm()

    } catch(error) {
      console.error(error);
    }
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
                    <Form>
                      <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <Field name="name" type="text" className="form-control"/>
                        <ErrorMessage name="name" className="text-danger" component="span"/>
                      </div>
    
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" className="form-control"/>
                        <ErrorMessage name="email" className="text-danger" component="span"/>
                      </div>
    
                      <div className="form-group">
                        <label htmlFor="phoneNumber">Numéro de téléphone</label>
                        <Field name="phoneNumber" type="text" className="form-control" id="password"/>
                        <ErrorMessage name="phoneNumber" className="text-danger" component="span"/>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <Field name="password" type="password" className="form-control" id="password"/>
                        <ErrorMessage name="password" className="text-danger" component="span"/>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="passwordConfirmation">Mot de passe (confirmation)</label>
                        <Field name="passwordConfirmation" type="password"  className="form-control" id="password"/>
                        <ErrorMessage name="passwordConfirmation" className="text-danger" component="span"/>
                      </div>
    
                      <div className="custom-control custom-checkbox">
                        <Field name="gcu" type="checkbox" className="custom-control-input" id="gcu" />
                        <label className="custom-control-label" htmlFor="gcu">J'accepte <a href="#" _target="blank">les conditions d'utilisation</a></label>
                        <ErrorMessage name="gcu" className="text-danger" component="div"/>
                      </div>
                      
                      <div className="form-group mt-4">
                      <button className="btn btn-light-primary px-4"
                        disabled={! formik.isValid || formik.isSubmitting}
                      >Créer mon compte</button>
                    </div>
                    </Form>
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
