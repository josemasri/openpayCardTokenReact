import React, { useEffect, useState } from "react";

function App() {
  const [paymentData, setPaymentData] = useState({
    deviceSessionId: "",
    tokenId: "",
  });
  const [cardForm, setCardForm] = useState({
    card_number: "",
    holder_name: "",
    expiration_year: "",
    expiration_month: "",
    cvv2: "",
  });

  useEffect(() => {
    /*global OpenPay*/
    OpenPay.setId(process.env.REACT_APP_OPENPAY_ID);
    OpenPay.setApiKey(process.env.REACT_APP_OPENPAY_PUBLIC_KEY);
    OpenPay.setSandboxMode(true);
    //Se genera el id de dispositivo
    setPaymentData({
      ...paymentData,
      deviceSessionId: OpenPay.deviceData.setup(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    card_number,
    cvv2,
    expiration_month,
    expiration_year,
    holder_name,
  } = cardForm;

  const handleChange = (e) => {
    setCardForm({
      ...cardForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = () => {
    createToken();
  };

  const createToken = () => {
    OpenPay.token.create(cardForm, sucessCallbak, console.log);
  };

  const sucessCallbak = (response) => {
    setPaymentData({
      ...paymentData,
      tokenId: response.data.id,
    });
  };

  return (
    <div className="bkng-tb-cntnt">
      <div className="pymnts">
        <form action="#" method="POST" id="paymentForm">
          <div className="pymnt-itm card active">
            <h2>Tarjeta de crédito o débito</h2>
            <div className="pymnt-cntnt">
              <div className="card-expl">
                <div className="credit">
                  <h4>Tarjetas de crédito</h4>
                </div>
                <div className="debit">
                  <h4>Tarjetas de débito</h4>
                </div>
              </div>
              <div className="sctn-row">
                <div className="sctn-col l">
                  <label>Nombre del titular</label>
                  <input
                    type="text"
                    placeholder="Como aparece en la tarjeta"
                    autoComplete="off"
                    data-openpay-card="holder_name"
                    name="holder_name"
                    value={holder_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="sctn-col">
                  <label>Número de tarjeta</label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="card_number"
                    value={card_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="sctn-row">
                <div className="sctn-col l">
                  <label>Fecha de expiración</label>
                  <div className="sctn-col half l">
                    <input
                      type="text"
                      placeholder="Mes"
                      name="expiration_month"
                      value={expiration_month}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="sctn-col half l">
                    <input
                      type="text"
                      placeholder="Año"
                      name="expiration_year"
                      value={expiration_year}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="sctn-col cvv">
                  <label>Código de seguridad</label>
                  <div className="sctn-col half l">
                    <input
                      type="text"
                      placeholder="3 dígitos"
                      autoComplete="off"
                      value={cvv2}
                      name="cvv2"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="openpay">
                <div className="logo">Transacciones realizadas vía:</div>
                <div className="shield">
                  Tus pagos se realizan de forma segura con encriptación de 256
                  bits
                </div>
              </div>
              <div className="sctn-row">
                <button
                  type="button"
                  className="button rght"
                  id="pay-button"
                  onClick={handlePayment}
                >
                  Pagar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
