import moment from 'moment';
import React from 'react';
import { GrMapLocation } from 'react-icons/gr';
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from 'react-icons/md';

const ViewTravelStory = ({
  onClose,
  onEditClick,
  onDeleteClick,
  storyInfo,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 bg-cyan-50 p-2 rounded-l-lg ">
            <button className="btn-small" onClick={onEditClick}>
              <MdUpdate className="text-lg" /> UPDATE STORY
            </button>

            <button className="btn-small btn-delete" onClick={onDeleteClick}>
              <MdDeleteOutline className="text-lg" /> Delete
            </button>

            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-slate-500">
            {storyInfo && storyInfo.title}
          </h1>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {storyInfo && storyInfo.visitedDate}
              سلسل
            </span>
            <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1">
              <GrMapLocation className="text-sm" />
              {storyInfo &&
                storyInfo.visitedLocation.map((item, index) =>
                  storyInfo.visitedLocation.length == index + 1
                    ? `${item}`
                    : `${item},`
                )}
            </div>
          </div>
        </div>

        <img
          src={storyInfo && storyInfo.image}
          alt="selected"
          className="w-full h-[300px] object-cover rounded-lg"
        />
        <div className="mt-4">
          <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">
            {storyInfo && storyInfo?.story}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
