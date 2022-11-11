import React from "react";
// import { useProfessions } from "../../hooks/useProfession";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    // const { isLoading, getProfession } = useProfessions();
    // const prof = getProfession(id);
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
