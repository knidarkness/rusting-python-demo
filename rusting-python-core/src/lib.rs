use pyo3::prelude::*;

#[pyclass]
struct Sorter {
    data: Vec<i32>,
    i: i32,
    j: i32,
    sorted: bool,
}

#[pymethods]
impl Sorter {
    #[new]
    fn new(data: Vec<i32>) -> Self {
        Sorter { data: data, i: 0, j: 0, sorted: false}
    }

    fn is_sorted(&self) -> bool {
        self.sorted
    }

    fn step(&mut self) -> Vec<i32> {
        if self.i < self.data.len() as i32 {
            if self.j < self.data.len() as i32 - self.i - 1 {
                if self.data[self.j as usize] > self.data[(self.j + 1) as usize] {
                    self.data.swap(self.j as usize, (self.j + 1) as usize);
                }
                self.j += 1;
            } else {
                self.j = 0;
                self.i += 1;
            }
        } else {
            self.sorted = true;
        }
        self.data.clone()
    }
}


/// A Python module implemented in Rust.
#[pymodule]
fn rusting_python_core(_py: Python, m: &PyModule) -> PyResult<()> {
    let _ = m.add_class::<Sorter>();
    Ok(())
}
