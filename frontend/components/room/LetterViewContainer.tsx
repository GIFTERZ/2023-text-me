import React, { useEffect } from 'react';
import { useLetterView } from '../../stores/useLetterView';
import { Overlay } from '../../styles/components/Modal';
import LetterView from './LetterView';
import LetterViewMove from './LetterViewMove';

function LetterViewContainer() {
  const { isOpened, id, getLetter, close } = useLetterView();

  useEffect(() => {
    if (id) {
      getLetter();
    }
  }, [id]);

  if (!isOpened) {
    return <></>;
  }

  return (
    <div>
      <Overlay onClick={close} />
      <LetterViewMove>
        <LetterView />
      </LetterViewMove>
    </div>
  );
}

export default LetterViewContainer;
