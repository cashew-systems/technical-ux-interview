import { useState } from "react";
import {Box, Modal} from "@mui/material";

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
  )

}

const ReferenceNumberModal = ({closeModal}: {closeModal: () => void}) => {

  const [referenceNumbers, setReferenceNumbers] = useState<string[]>([]);
  return (
  <Modal open={true} onClose={closeModal}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
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
    </Box>
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
          <div><a onClick={() => setReferenceNumberModalShowing(true)}>Reference number</a></div>
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
