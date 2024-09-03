import {
  CheckBadgeIcon,
  HomeModernIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { useState } from "react";
import Btn from "./Btn";

const defaultIconWithDetails = [
  {
    icon: <HomeModernIcon />,
    iconDetails:
      "Gloria St., Purok Hervias 2, Brgy. Villamonte, Bacolod City, Negros Occidental, Philippines, 6100",
  },
  {
    icon: <HomeModernIcon />,
    iconDetails:
      "Gloria St., Purok Hervias 2, Brgy. Villamonte, Bacolod City, Negros Occidental, Philippines, 6100",
  },
];

export default function Card({
  imgSrc = "/Asset2.png",
  title = "john title de-asis",
  mainDescription = "funny",
  description = "tall, dark and handsome",
  iconWithDetails = defaultIconWithDetails,
}) {
  const [expand, expandSet] = useState(true);
  return (
    <div className="container2">
      <div
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg p-1 hover:bg-slate-200/20"
        onClick={() => expandSet(!expand)}
      >
        <img
          src={imgSrc}
          alt={imgSrc}
          className="h-32 w-32 rounded-full object-cover"
          title={imgSrc}
        />
        <div className="flex flex-col items-center">
          <h1 className="flex flex-wrap justify-center gap-x-1 text-lg font-semibold tracking-wide md:text-3xl">
            {title}
          </h1>
          <p className="font-bold capitalize tracking-wider">
            {mainDescription}
          </p>
          <p className="flex flex-wrap justify-center gap-x-1">{description}</p>
        </div>
      </div>

      {expand && (
        <div className="mt-4 flex flex-col gap-4">
          {iconWithDetails.map((iconDetail, i) => (
            <IconContentMap key={i} iconDetail={iconDetail}></IconContentMap>
          ))}
        </div>
      )}
      <div className="mt-6 flex flex-wrap justify-evenly">
        <Btn
          text="confirm"
          color="blue"
          icon={<CheckBadgeIcon color="mediumturquoise" />}
        ></Btn>
        <Btn
          text="edit"
          color="yellow"
          icon={<PencilIcon color="yellow" />}
        ></Btn>
        <Btn
          text="delete"
          color="red"
          icon={<TrashIcon color="crimson" />}
        ></Btn>
      </div>
    </div>
  );
}

Card.propTypes = {
  imgSrc: PropTypes.any,
  title: PropTypes.any,
  mainDescription: PropTypes.any,
  description: PropTypes.any,
  iconWithDetails: PropTypes.any,
};

export function IconContentMap({ iconDetail }) {
  console.log(iconDetail);
  return (
    <div className="flex flex-col items-center">
      <div className="w-8">{iconDetail.icon}</div>
      <span className="capitalize">{iconDetail.iconDetails}</span>
    </div>
  );
}

IconContentMap.propTypes = {
  iconDetail: PropTypes.any,
};
