import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editMedia, getMedia } from "../../store/mediaSlice";
import { useForm, useFieldArray } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { FormStages } from "../../components";

const UpdateMovies = () => {
  const { register, setValue, handleSubmit, control } = useForm();
  const { mediaId } = useParams();
  const genres = useSelector((state) => state.genres.genres);
  const [stage, setStage] = useState(1);
  const [date, setDate] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [defaultGenres, setDefaultGenres] = useState([]);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaultDate, setDefaultDate] = useState();

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "cast",
  });

  useEffect(() => {
    dispatch(getMedia({ id: mediaId })).then((res) => {
      const mediaData = res.payload?.data;

      setValue("name", mediaData?.name);
      setValue("description", mediaData?.description);
      setValue("language", mediaData?.language?.join(","));
      setValue("rating", mediaData?.rating);
      setValue("type", mediaData?.type);
      setValue("duration", mediaData?.duration?.replace("per EP", ""));
      setDefaultDate(mediaData?.releaseYear); // Set default date to the beginning of the year
      setDate(mediaData?.releaseYear);

      const initialGenres = mediaData?.genre?.map((item) => ({
        label: item,
        value: item,
      }));
      setDefaultGenres(initialGenres);
      setSelectedGenres(mediaData?.genre || []);

      // Replace the entire cast array with the new values
      replace(mediaData?.cast || [{ name: "", roleType: "" }]);
    });
  }, [dispatch, mediaId, setValue, replace]);

  const submit = async (data) => {
    for (const key in data) {
      if (!data[key]) {
        toast.error(`Please Provide ${key}`);
        return; // Exit the function if any field is missing
      }
    }
    if (selectedGenres.length === 0) {
      toast.error(`Please Select Genres`);
      return; // Exit the function if genres are not selected
    }

    let dater = new Date(date);
    data.language = data.language.replace(" ", "").trim().split(",");
    data.releaseYear = dater.getFullYear();
    data.genres = selectedGenres;


    const formData = new FormData();
    if (data.img.length !== 0) {
      formData.append("img", data.img[0]);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("releaseYear", data.releaseYear);
    formData.append("duration", data.duration);
    formData.append("language", JSON.stringify(data.language));
    formData.append("rating", data.rating);
    formData.append("genres", JSON.stringify(data.genres));
    formData.append("cast", JSON.stringify(data.cast));

    setDisable(true);

    const response = await dispatch(editMedia({ data: formData, id: mediaId }));

    if (response.payload) {
      navigate(`/media/${add.payload.data._id}`);
    } else {
      toast.error("Failed to update media.");
    }

    setDisable(false);
  };

  const handleGenreChange = (selected) => {
    setSelectedGenres(selected.map((item) => item.value));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen p-12">
      <Link to="/admin" className="absolute left-2 top-6 xs:left-6 font-bold text-white font-roboto">
        <FaArrowLeft color="white" size={25} />
      </Link>
      <h1 className="text-white text-4xl xs:text-5xl font-bold font-monstserrat">Update Media</h1>
      <form onSubmit={handleSubmit(submit)} className="w-full flex flex-col justify-center items-center mt-10">
        <FormStages
          append={append}
          date={date}
          defaultDateValue={defaultDate}
          disable={disable}
          fields={fields}
          genres={genres}
          handleGenreChange={handleGenreChange}
          register={register}
          remove={remove}
          selectedGenres={defaultGenres}
          setDate={setDate}
          setSelectedGenres={setSelectedGenres}
          setStage={setStage}
          stage={stage}
        />
      </form>
    </div>
  );
};

export default UpdateMovies;
