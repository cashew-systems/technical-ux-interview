import {CSSProperties, ReactNode, useState} from "react";



const Modal = ({ open, onClose, children }: {open: boolean, onClose: () => void, children: ReactNode }) => {
  if (!open) return null;

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const contentStyle: CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '80%',
    maxHeight: '80%',
    overflow: 'auto',
    borderRadius: '4px',
    zIndex: 1001
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const StopInformation = ({stopType}: {stopType: 'Pickup' | 'Delivery'}) => {

  return (
    <div>
      <input placeholder={`${stopType} address name`}/>
      <input placeholder={`${stopType} address line 1`}/>
      <input placeholder={`${stopType} address line 2`}/>
      <input placeholder={`${stopType} address city`}/>
      <input placeholder={`${stopType} address state`}/>
      <input placeholder={`${stopType} address zipcode`}/>
    </div>
  );
}

const ReferenceNumberModal = ({closeModal}: {closeModal: () => void}) => {

  const [referenceNumbers, setReferenceNumbers] = useState<string[]>([]);
  return (
  <Modal open={true} onClose={closeModal}>
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        width: 400,
        border: '2px solid #000',
        boxShadow: '24',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {referenceNumbers.map((referenceNumber) => (
        <input value='reference number'/>)
      )
      }
      <button onClick={() => setReferenceNumbers([...referenceNumbers, 'new number'])}>Add reference number</button>
      <button onClick={closeModal}>Confirm </button>
    </div>
  </Modal>
  )

}

const Form = () => {
  const [showPickup, setShowPickup] = useState<boolean>(false);
  const [showDelivery, setShowDelivery] = useState<boolean>(false);
  const [referenceNumberModalShowing, setReferenceNumberModalShowing] = useState<boolean>(false);

  return (
    <div style={{backgroundColor: '#282c34', width: '100%', height: '100vh', color: 'black', position: 'relative'}}>
      <div style={{display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   margin: '0 auto',
                   width: '20%',
                   height: '40%',
                   backgroundColor: 'white',
                   justifyContent: 'center',
                   top: '20%',
                   position: 'relative'
                   }}>
        {referenceNumberModalShowing && <ReferenceNumberModal closeModal={() => setReferenceNumberModalShowing(false)} />}
        <div>
          <div><a onClick={() => setReferenceNumberModalShowing(true)} style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Reference number</a></div>
          <input placeholder="reference number" />
          <input placeholder="for name" />
          <input placeholder="for phone" />
          <input placeholder="delivery date" />
        </div>
        <div>
          <label>Includes pickup</label><input type='checkbox' checked={showPickup} onChange={ () => setShowPickup(!showPickup)}/>
          <label>Includes delivery</label><input type='checkbox' checked={showDelivery} onChange={ () => setShowDelivery(!showDelivery)}/>
        </div>
        <div>
          {showPickup && <StopInformation stopType='Pickup' />}
          {showDelivery && <StopInformation stopType='Delivery' />}
        </div>
        <button>Submit</button>
      </div>
    </div>
  );

}

export default Form;
