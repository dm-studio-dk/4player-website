export default function InitiativeAbout({ headline, body }) {
    return (
        <div>
            <div className="container mx-auto module-wrapper my-10">
                <div className="site-grid">
                    <h2 className="col-span-full lg:col-span-6 lg:col-start-4 font-display text-center text-2xl lg:text-[40px]">
                        {headline}
                    </h2>
                </div>
                <div className="site-grid mt-5">
                    <p className="col-span-full lg:col-span-6 lg:col-start-4 whitespace-pre-wrap">
                        {body}
                    </p>
                </div>
            </div>
        </div>
    )
}
