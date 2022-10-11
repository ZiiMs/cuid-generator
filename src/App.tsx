import cuid from 'cuid';
import { useEffect, useState } from 'react';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import './App.css';

function App() {
  const [CUID, setCuid] = useState('');
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    if (!isPopoverOpen) return;
    const timeout = setTimeout(() => {
      setPopoverOpen(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isPopoverOpen]);

  return (
    <div className='App'>
      <h1>CUID Generator</h1>
      <div hidden={CUID === ''}>
        <div className='TextBox'>
          <p>{CUID}</p>
          <Popover
            isOpen={isPopoverOpen}
            positions={['right']}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={'#313131'}
                arrowSize={5}
                className='popover-arrow-container'
                arrowClassName='popover-arrow'
              >
                <div className='Popover'>
                  <span>Copied</span>
                </div>
              </ArrowContainer>
            )}
          >
            <button
              className='CopyButton'
              onClick={() => {
                setPopoverOpen(true);
                navigator.clipboard.writeText(CUID);
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='ClipboardIcon'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184'
                />
              </svg>
            </button>
          </Popover>
        </div>
      </div>
      <div className=''>
        <button
          onClick={() => {
            const newCUID = cuid();
            setCuid(newCUID);
          }}
        >
          Generate new CUID
        </button>
      </div>
    </div>
  );
}

export default App;

