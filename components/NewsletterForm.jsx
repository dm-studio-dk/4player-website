import { submitNewsletterForm } from "lib/form"
import { useState } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import FormField from "./FormField"
import SubmitButton from "./SubmitButton"

export default function NewsletterForm({ title, description }) {
    const formRef = useRef()
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState(null)
    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault()
            if (submitting) return

            setSubmitting(true)

            const request = await submitNewsletterForm({
                form: formRef.current,
            })

            if (!request || request?.status !== 200) {
                setMessage(() => "Noget gik galt, prøv igen")
            } else {
                formRef.current.reset()
                setMessage(() => "Du er nu skrevet op til nyhedsbrevet")
            }
            setTimeout(() => {
                setMessage(null)
            }, 10000)

            setSubmitting(false)
        },
        [formRef],
    )

    return (
        <div>
            <div className="module-divider"></div>
            <div className="container mx-auto module-wrapper">
                <div className="site-grid">
                    <h2 className="text-3xl lg:text-5xl leading-[1.1] col-span-full lg:col-span-8 lg:col-start-3 text-center font-display max-w-[32ch] mx-auto">
                        {title}
                    </h2>
                    <p className="mt-6 text-lg text-center col-span-full lg:col-span-6 lg:col-start-4">
                        {description}
                    </p>
                </div>
                <div className="mt-10 site-grid">
                    <form
                        ref={formRef}
                        onSubmitCapture={handleSubmit}
                        className="space-y-2 col-span-full lg:col-span-6 lg:col-start-4">
                        <FormField
                            inputClassName="border-black-full border-opacity-20"
                            type="email"
                            name="email"
                            label="E-mail"
                        />
                        <SubmitButton loading={submitting}>
                            {submitting
                                ? "Vent venligst..."
                                : message || "Send"}
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    )
}
