export default function ModuleNotFound({ module }) {
    return (
        <div className="bg-slate-200 my-10 p-20">
            <div className="inner">
                <details>
                    <summary>
                        <div className="border-2 border-slate-800 uppercase rounded-md inline-block mx-auto cursor-pointer p-2">
                            {module._type.replace("module", "")}
                        </div>
                    </summary>
                    <div className="code-container bg-slate-50 p-10 rounded-md mt-10">
                        <pre>{JSON.stringify(module, null, 4)}</pre>
                    </div>
                </details>
            </div>
        </div>
    )
}
