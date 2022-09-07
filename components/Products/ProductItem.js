import React from 'react'
import InfoModal from '../Modal/InfoModal'
import DeleteModal from '../Modal/DeleteModal'
import {
  deleteProduct,
  fetchProductInfoHandler,
  updateProductHandler,
} from './helpers/productHandlers'
import {DeleteProductInfo, ProductInfoForm} from './helpers/productComponents'
import EditModal from '../Modal/EditModal'
import useEditableForm from '../../utils/useEditableForm'
import {DOMAINS} from '../../constants/appConstants'

const ProductDelete = ({id, title, actions}) => {
  return (
    <DeleteModal
      deleteModalHandler={deleteProduct(id, actions)}
      modalTitle="Borrar Producto"
    >
      <DeleteProductInfo id={id} title={title} />
    </DeleteModal>
  )
}

const ProductInfo = ({id, state, actions}) => {
  return (
    <InfoModal
      getModalHandler={fetchProductInfoHandler(id, state, actions)}
      modalTitle="Ver Producto"
    >
      <ProductInfoForm />
    </InfoModal>
  )
}

const ProductEdit = ({id, actions, state}) => {
  const {handleSubmit, EditableForm} = useEditableForm()
  return (
    <EditModal
      getModalHandler={fetchProductInfoHandler(id, state, actions)}
      postModalHandler={handleSubmit(updateProductHandler(id, actions))}
      modalTitle="Editar Producto"
    >
      <EditableForm domain={DOMAINS.PRODUCTS} encType={'multipart/form-data'} />
    </EditModal>
  )
}

const ProductButtons = ({id, title, actions, state}) => {
  return (
    <div className="flex justify-end">
      <ProductInfo id={id} state={state} actions={actions} />
      <ProductEdit id={id} actions={actions} state={state} />
      <ProductDelete id={id} title={title} actions={actions} />
    </div>
  )
}

const ProductItem = ({title, image, id, actions, state, key}) => {
  return (
    <li
      className="panel-block is-flex item-container is-justify-content-space-between"
      id={id}
      key={key}
    >
      <div className="product-left is-flex is-justify-content-space-between ">
        <figure className="image is-64x64 is-hidden-mobile">
          <img src={image} alt="Product image" />
        </figure>
        <span className="product-title ml-2"> {`Producto: ${title}`}</span>
      </div>
      <ProductButtons id={id} title={title} actions={actions} state={state} />
    </li>
  )
}

export default ProductItem
