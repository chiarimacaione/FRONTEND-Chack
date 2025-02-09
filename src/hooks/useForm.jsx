import { useState } from "react";

const useForm = (initialState = {}) => {
    const [formState, setFormState] = useState(initialState);

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const resetForm = () => {
        setFormState(initialState);
    };

    return { formState, handleChangeInput, resetForm }
}

export default useForm
