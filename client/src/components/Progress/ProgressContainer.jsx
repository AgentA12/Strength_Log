import { useState } from "react";
import ProgressCard from "./ProgressCard";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_TEMPLATES,
  GET_TEMPLATES_PROGRESS,
} from "../../utils/graphql/queries";
import TemplateCard from "./TemplateCard";
import auth from "../../utils/auth/auth";
import Spinner from "../miscellaneous/Spinner";
import { FcSearch } from "react-icons/fc";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProgressContainer() {
  const [activeTemplate, setActiveTemplate] = useState("Select A Template");

  const {
    data: { _id: userID },
  } = auth.getInfo();

  const { loading, error, data } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const [loadOneTemplate, res] = useLazyQuery(GET_TEMPLATES_PROGRESS);

  async function handleQuery(templateId) {
    await loadOneTemplate({
      variables: {
        templateID: templateId,
        userID: userID,
      },
    });
  }

  if (error) console.log(error);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: true,
    className: "mb-10",
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="w-9/12 md:w-10/12 xl:w-8/12 m-auto mt-20">
        <div className="flex flex-col gap-5 items-center justify-center pb-4 mb-4">
          <h1 className="text-primary text-6xl font-extrabold">Progress</h1>

          <label className="relative inline-block w-64">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <FcSearch size={24} />
            </span>
            <input
              className="placeholder:italic bg-inherit placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-0 sm:text-sm"
              placeholder="Search for templates"
              type="text"
              name="search"
            />
          </label>
        </div>

        <div>
          {data?.getTemplatesForUser.length ? (
            <Slider {...settings}>
              {data?.getTemplatesForUser.map((template) => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  handleQuery={handleQuery}
                  res={res}
                  activeTemplate={activeTemplate}
                  setActiveTemplate={setActiveTemplate}
                />
              ))}
            </Slider>
          ) : (
            <p className="text-center">you have no templates saved</p>
          )}
        </div>

        <p className="text-white text-center text-3xl font-extrabold mb-5">
          {activeTemplate}
        </p>

        <div className="card-container flex justify-center mb-10">
          <div className="flex flex-col gap-5 h-custom-2 w-custom">
            {res.data?.getProgress ? (
              res.data.getProgress.map((progressInfo) => (
                <ProgressCard
                  progressInfo={progressInfo}
                  key={progressInfo._id}
                />
              ))
            ) : (
              <p className="text-lg">You haven't saved workouts</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
