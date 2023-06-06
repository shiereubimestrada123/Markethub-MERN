import { Modal } from 'antd'

const ProductsForm = ({ showProductForm, setShowProductForm }) => {
  return (
    <>
      <Modal
        title=''
        open={showProductForm}
        onCancel={() => setShowProductForm(false)}
        centered
      >
        <h1>Products Form</h1>
      </Modal>
    </>
  )
}

export default ProductsForm