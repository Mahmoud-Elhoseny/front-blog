import React from 'react';
import Modal from 'react-modal';
import ViewTravelStory from '../../pages/Home/ViewTravelStory';

const ViewTravelStoryModal = ({
  setOpenViewModal,
  openViewModal,
  handleEdit,
  deleteTravelStory,
}) => {
  // Format the date before passing it to child components
  const formatStoryData = (data) => {
    if (!data) return null;
    return {
      ...data,
      visitedDate: data.visitedDate ? new Date(data.visitedDate) : null
    };
  };

  return (
    <Modal
      isOpen={openViewModal.isShown}
      onRequestClose={() => setOpenViewModal({ isShown: false, data: null })}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 1000,
        },
      }}
      appElement={document.getElementById('root')}
      className="model-box"
    >
      <ViewTravelStory
        storyInfo={formatStoryData(openViewModal.data)}
        onClose={() =>
          setOpenViewModal((prev) => ({ ...prev, isShown: false }))
        }
        onEditClick={() => {
          setOpenViewModal((prev) => ({ ...prev, isShown: false }));
          handleEdit(formatStoryData(openViewModal.data));
        }}
        onDeleteClick={() => {
          deleteTravelStory(openViewModal.data);
        }}
      />
    </Modal>
  );
};

export default ViewTravelStoryModal;
