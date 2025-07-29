import { AppContainer } from './components/AppContainer/AppContainer'

const NUM_PAD_NUMBERS: number[][] = [
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3]
]

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <AppContainer>
        <div>
          {NUM_PAD_NUMBERS.map((row, index) => (
            <div key={`${index}-row`} className="flex gap-1.5">
              {row.map((num) => (
                <button key={`${num}-key`} onClick={() => console.log(num)}>
                  {num}
                </button>
              ))}
            </div>
          ))}
        </div>
      </AppContainer>
    </>
  )
}

export default App
