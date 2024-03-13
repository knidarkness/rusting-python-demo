from rusting_python_core import Sorter
import io
import base64
import matplotlib.pyplot as plt 
from rusting_python_core import Sorter

sorter: Sorter | None = None    

def initialize(data: list[int]):
    global sorter
    sorter = Sorter(data)

def get_step_image() -> str:
    plt.clf()
    plt.figure(figsize=(5, 5), dpi=200)
    plt.axis('off')
    data = sorter.step()
    xs = list(range(len(data)))
    plt.bar(xs, data)

    ioBuffer = io.BytesIO()
    plt.savefig(ioBuffer, format='jpg')
    ioBuffer.seek(0)
    base64_image = base64.b64encode(ioBuffer.read()).decode()
    plt.close()
    return base64_image

def is_sorted() -> bool:
    return sorter.is_sorted()

[initialize, get_step_image, is_sorted]
