python -m venv rusting-python
source ./rusting-python/bin/activate
pip install maturin
rustup default nightly
rustup target add wasm32-unknown-emscripten
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install 3.1.46
./emsdk activate 3.1.46
source ./emsdk_env.sh
cd ..
cd rusting-python-core
maturin build --release --target wasm32-unknown-emscripten -i 3.11