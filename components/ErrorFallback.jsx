export default (module) =>
    function ErrorFallback() {
        return (
            <div className="container mx-auto bg-red-200 border-red-400 text-amber-900 p-4 space-y-10">
                <h2 className="text-amber-900 text-center text-3xl font-display">
                    An error occured
                </h2>
                <p>
                    This module {module._type} cannot be shown due to an error.
                    This could be because:
                </p>
                <ul>
                    <li>Not enough data has been typed into Sanity document</li>
                    <li>Data could not be fetched due to a network error</li>
                    <li>A bug in the code caused this</li>
                </ul>
                <p>The administrator has been notified of this error.</p>
            </div>
        )
    }
