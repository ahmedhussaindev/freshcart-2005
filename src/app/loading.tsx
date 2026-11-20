import { PulseLoader } from "react-spinners";
export default function Loading() {
    return (
        <div className="flex h-screen justify-center items-center">
            <PulseLoader color="#15803D" />
        </div>
    )
}