async function main() {            
    document.querySelector("#blobImage").src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    let pyodide = await loadPyodide();

    await pyodide.loadPackage("micropip");

    const micropip = pyodide.pyimport("micropip");
    await micropip.install('matplotlib')
    await micropip.install('./rusting_python_core-0.1.0-cp311-cp311-emscripten_3_1_46_wasm32.whl')

    const pythonScript = await (await fetch("./rust_sorting_visualizer.py")).text();
    
    const [initialize, step, is_sorted] = pyodide.runPython(pythonScript);
    document.rusting_python_core = {initialize, step, is_sorted};

    document.querySelector("#demostart").addEventListener("click", async () => {
        demoLenInput = document.querySelector("#demoLenInput").value || '15';
        console.log(demoLenInput);
        const randomIntegers = Array.from({length: parseInt(demoLenInput, 10)}, () => Math.floor(Math.random() * 100));
        document.rusting_python_core.initialize(randomIntegers);
        while (!document.rusting_python_core.is_sorted()) {
            const res_py = document.rusting_python_core.step();
            const imgBase64 = res_py;
            document.querySelector("#blobImage").src = 'data:image/jpeg;base64,'+ imgBase64;
            await new Promise(r => setTimeout(r, 30));
        }
    });
};

document.addEventListener("DOMContentLoaded", main);
