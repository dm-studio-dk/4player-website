import FormField from "components/FormField"
import SubmitButton from "components/SubmitButton"
import { FORM_CONFIG } from "config/const"
import { submitForm } from "lib/form"
import { useCallback, useRef, useState } from "react"

export default function ModuleForm({ module }) {
    const formRef = useRef()
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState(null)
    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault()
            if (submitting) return

            setSubmitting(true)
            const fields =
                formType != "general" && FORM_CONFIG[formType]
                    ? FORM_CONFIG[formType]
                    : [
                          ...FORM_CONFIG["general"],
                          ...(module.customFields || []),
                      ]

            const request = await submitForm({
                form: formRef.current,
                fields,
                lang: english ? "en" : "da",
                formType: module.formType,
                subject: module.subject,
            })

            if (!request || request?.status !== 200) {
                setMessage(() =>
                    english
                        ? "Something went wrong. Try again"
                        : "Noget gik galt, prøv igen",
                )
            } else {
                formRef.current.reset()
                setMessage(() =>
                    english
                        ? "Thank you for your inquiry"
                        : "Tak for din henvendelse",
                )
            }

            setTimeout(() => {
                setMessage(null)
            }, 10000)

            setSubmitting(false)
        },
        [formRef],
    )

    const {
        formType, // string: "4player", "member", "general", "partner", "team spillerforeningn"
        title, // string
        description, // portable text
        customFields = [],
        english,
    } = module
    const fields =
        formType != "general" &&
        (FORM_CONFIG[formType + (english ? "_english" : "")] ||
            FORM_CONFIG[formType])
            ? FORM_CONFIG[formType + (english ? "_english" : "")] ||
              FORM_CONFIG[formType]
            : [...FORM_CONFIG["general"], ...customFields]

    return (
        <div>
            <div className="bg-green-chill" id={formType}>
                <div className="container mx-auto module-wrapper">
                    <div className="site-grid">
                        <h2 className="text-3xl lg:text-5xl leading-[1.1] col-span-full lg:col-span-8 lg:col-start-3 text-center font-display max-w-[32ch] mx-auto">
                            {title}
                        </h2>
                        <p className="mt-6 text-lg col-span-full lg:col-span-6 lg:col-start-4">
                            {description}
                        </p>
                    </div>
                    <div className="mt-10 site-grid">
                        <form
                            ref={formRef}
                            onSubmitCapture={handleSubmit}
                            className="space-y-2 col-span-full lg:col-span-6 lg:col-start-4">
                            {fields.map((field) => (
                                <FormField
                                    inputClassName="border-green-chill-line"
                                    key={field.name}
                                    {...field}
                                />
                            ))}
                            <SubmitButton loading={submitting}>
                                {submitting
                                    ? english
                                        ? "Please wait..."
                                        : "Vent venligst..."
                                    : message || "Send"}
                            </SubmitButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
