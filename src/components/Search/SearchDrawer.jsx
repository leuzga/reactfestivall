import SearchForm from './SearchForm';
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
} from '@fluentui/react-components';
import { TbArrowBigLeftLines } from 'react-icons/tb';

const SearchDrawer = ({ open, onClose }) => {
  return (
    <div>
      <OverlayDrawer
        open={open}
        modalType='alert'
        style={{
          top: 0,
          bottom: 'auto',
          height: '60%',
          width: '100%',
          animation: open
            ? 'slideDownDrawer 0.5s ease-in-out'
            : 'slideUpDrawer 0.5s ease-in-out',
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance='subtle'
                aria-label='Close'
                icon={<TbArrowBigLeftLines />}
                onClick={onClose}
              />
            }
          ></DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <SearchForm />
        </DrawerBody>
      </OverlayDrawer>
    </div>
  );
};

export default SearchDrawer;
