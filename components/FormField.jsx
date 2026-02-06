import classNames from "classnames"

export default function FormField(props) {
    if (["email", "text", "tel"].includes(props.type))
        return <Input {...props} />
    if (props.type == "select") return <Select {...props} />

    return null
}

const Input = ({
    type,
    name,
    label,
    placeholder,
    inputClassName,
    pattern,
    required = true,
}) => (
    <div>
        <input
            required={required}
            className={classNames(
                "bg-transparent text-center placeholder-black-almost placeholder-opacity-60 text-lg py-5 lg:py-7 block w-full border",
                inputClassName,
            )}
            type={type}
            pattern={pattern}
            name={name}
            placeholder={placeholder || label}></input>
    </div>
)

const Select = ({ name, label, value, options = [] }) => (
    <div>
        <select
            required
            name={name}
            defaultValue={""}
            className={classNames(
                "w-full px-0 mx-0 text-lg text-center bg-transparent border appearance-none border-green-chill-line py-7",
                {
                    "invalid:border-red-500": value && value != "",
                },
            )}>
            <option value="" disabled hidden>
                Vælg {label}
            </option>
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.value}
                </option>
            ))}
        </select>
    </div>
)
