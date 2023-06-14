

export const PopUp = ({ handleCloseAlert, errorMessage }) => {


  return (

    <div class="alert alert-primary" role="alert" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div>
    <strong>Error!</strong> {errorMessage}
  </div>
  <div>
    <img
      type="close"
      style={{ width: 20, height: 20 }}
      onClick={handleCloseAlert}
      src="public/close.png"
      alt="Close"
    />
  </div>
</div>
  )

}
