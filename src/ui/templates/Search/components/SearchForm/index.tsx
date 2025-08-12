import { Button } from '@/ui/reusable/Button';
import { TextField } from '@/ui/reusable/TextField';

export const SearchForm = () => {
  return (
    <form className='flex flex-1 items-center justify-center gap-4'>
      <TextField
        label=''
        id='search'
        name='search'
        defaultValue={''}
        placeholder={'Find a product...'}
        className='flex flex-9 items-center justify-center'
      />
      <Button
        padding={2}
        type='submit'
        className='flex flex-1 items-center justify-center'
      >
        {'Search'}
      </Button>
    </form>
  );
};
