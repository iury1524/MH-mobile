import React from 'react';
import HeaderDetailsPage from '../components/HeaderDetailsPage'
import IcPayment from 'material-ui/lib/svg-icons/action/payment'
import {reduxForm} from 'redux-form'
import store from '../store/configureStore'
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import Card from 'react-credit-card'
import { connect } from 'react-redux'

const fields = ['cartNumber', 'fullName', 'expiry', 'cvc'];

const submitBtnStyle = {
  marginTop: 14,
}

//-------------------------------------------------//
//-------------- Begin Form validation  -----------//
//-------------------------------------------------//

const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ( typeof(values.cartNumber) === "undefined" || !values.cartNumber.length > 0) {
        reject({cartNumber: "Champ obligatoire"});
      } if ( typeof(values.fullName) === "undefined" || !values.fullName.length > 0) {
        reject({fullName: "Champ obligatoire"});
      } if ( typeof(values.expiry) === "undefined" || !values.expiry.length > 0) {
        reject({expiry: "Champ obligatoire"});
      } if ( typeof(values.cvc) === "undefined" || !values.cvc.length > 0) {
        reject({cvc: "Champ obligatoire"});
      } else {
        resolve();
        store.dispatch(routeActions.push('/envoi'))
      }
    }, 1000); // simulate server latency
  });
};

const numberValidation = (value) => {
  const re = /^\d+$/;
  return re.test(value);
}

const asyncValidate = (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ( typeof(values.cartNumber) !== "undefined" && numberValidation(values.cartNumber) === false && !values.cartNumber.length !== 14 ) {
        reject({cartNumber: "Format de numéro de carte invalide"});
      } if ( typeof(values.expiry) !== "undefined" && numberValidation(values.expiry) === false && !values.expiry.length < 4 && !values.expiry.length > 6 ) {
        reject({expiry: "Format de la date d'expiration invalide"});
      } if ( typeof(values.cvc) !== "undefined" && numberValidation(values.cvc) === false && !values.cvc.length !== 4 ) {
        reject({cvc: "Format cvc invalide"});
      } else {
        resolve();
      }
    }, 500);
  });
};

//-------------------------------------------------//
//-------------- End Form validation  -------------//
//-------------------------------------------------//

let storeState;
let _active;
class PaiementExp extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      focusedfield: this.props.focusedfield || 'cartNumber',
    }
  }

  render() {
    const { fields: {cartNumber, fullName, expiry, cvc} , handleSubmit} = this.props;
    storeState = store.getState();
    if(typeof (storeState.form.paiement) === "undefined") {
      _active = "name";
    }
    else {
        _active = storeState.form.paiement._active;
    }
    return (
      <div>
        <HeaderDetailsPage title="Paiement" className="header-bar" />
        <div id="paiement-container" className="container">
          <h1 className="container-title">Paiement</h1>
          <div className="card-preview-container">
              <Card
                type= "visa"
                name = {fullName.value}
                number = {cartNumber.value}
                expiry = {expiry.value}
                cvc = {cvc.value}
                focused = {_active}
              />
          </div>
          <div className="form-paiement">
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="Numéro de carte"
                  errorText={cartNumber.touched && cartNumber.error ? cartNumber.error : ''}
                   {...cartNumber}
                />
              </div>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="Nom complet"
                  errorText={fullName.touched && fullName.error ? fullName.error : ''}
                   {...fullName}
                />
              </div>
                <div>
                  <TextField
                    hintText="MM/YY"
                    floatingLabelText="Mois et Année"
                    errorText={expiry.touched && expiry.error ? expiry.error : ''}
                     {...expiry}
                  />
                </div>
                <div>
                  <TextField
                    hintText=""
                    floatingLabelText="CVC"
                    errorText={cvc.touched && cvc.error ? cvc.error : ''}
                    {...cvc}
                  />
                </div>
              <div className="submit-btn" style= {submitBtnStyle}>
                <RaisedButton
                  label="Payer"
                  icon={<IcPayment />}
                  onClick={() => store.dispatch(routeActions.push('/envoi'))}
                  primary={true} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

PaiementExp = reduxForm({
  form: 'paiement',
  fields,
  asyncValidate,
  asyncBlurFields: ['cartNumber', 'expiry', 'cvc'],
})(PaiementExp);



const mapStateToProps = (state) => {
  return {
    focused: "name",
  }
}


const Paiement = connect(
  mapStateToProps
)(PaiementExp)

export default Paiement;
