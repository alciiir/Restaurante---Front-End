import React from 'react'
import InfoModal from '../Modal/InfoModal'
import DeleteModal from '../Modal/DeleteModal'
import {
  deleteCategory,
  fetchCategoryInfoHandler,
  updateCategoryHandler,
} from './helpers/categoryHandlers'
import {DeleteCategoryInfo, CategoryInfoForm} from './helpers/categoryComponents'
import EditModal from '../Modal/EditModal'
import useEditableForm from '../../utils/useEditableForm'
import {DOMAINS} from '../../constants/appConstants'

const CategoryDelete = ({id, title, actions}) => {
  return (
    <DeleteModal
      deleteModalHandler={deleteCategory(id, actions)}
      modalTitle="Borrar Categoría"
    >
      <DeleteCategoryInfo id={id} title={title} />
    </DeleteModal>
  )
}

const CategoryInfo = ({id}) => {
  return (
    <InfoModal getModalHandler={fetchCategoryInfoHandler(id)} modalTitle="Ver Categoría">
      <CategoryInfoForm />
    </InfoModal>
  )
}

const CategoryEdit = ({id, actions}) => {
  const {handleSubmit, EditableForm} = useEditableForm()
  return (
    <EditModal
      getModalHandler={fetchCategoryInfoHandler(id)}
      postModalHandler={handleSubmit(updateCategoryHandler(id, actions))}
      modalTitle="Editar Categoría"
    >
      <EditableForm domain={DOMAINS.CATEGORIES} encType={'multipart/form-data'} />
    </EditModal>
  )
}

const CategoryButtons = ({id, title, actions}) => {
  return (
    <div className="flex justify-end">
      <CategoryInfo id={id} />
      <CategoryEdit id={id} actions={actions} />
      <CategoryDelete id={id} title={title} actions={actions} />
    </div>
  )
}

const CategoryItem = ({title, image, id, actions, key}) => {
  return (
    <li
      className="panel-block is-flex item-container is-justify-content-space-between"
      id={id}
      key={key}
    >
      <div className="category-left is-flex is-justify-content-space-between ">
        <figure className="image is-64x64 is-hidden-mobile">
          <img src={image} alt="Category image" />
        </figure>
        <span className="category-title ml-2">{`Categoría: ${title}`}</span>
      </div>
      <CategoryButtons id={id} title={title} actions={actions} />
    </li>
  )
}

export default CategoryItem
