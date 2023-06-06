import { useState } from "react";
import { Button } from "antd";

import ProductsForm from "./ProductsForm";

function Products() {
  const [showProductForm, setShowProductForm] = useState(false);

  return (
    <>
      <div className="flex justify-end mb-2">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(true);
          }}
        >
          Add Product
        </Button>
      </div>

      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
        />
      )}
    </>
  );
}

export default Products