export default function SubmitButton({ children }) {
    return (
        <button
            type="submit"
            className="bg-black-full py-7 font-display text-white text-2xl leading-[1] block w-full hover:opacity-60 transition-all duration-300">
            {children}
        </button>
    )
}
