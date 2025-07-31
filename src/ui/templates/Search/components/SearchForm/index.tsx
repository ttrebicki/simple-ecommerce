import { Button, TextField } from "@radix-ui/themes";

export const SearchForm = () => {
  return (
    <form>
      <TextField.Root
        size={"3"}
        id="search"
        name="search"
        defaultValue={""}
        placeholder={"Find a product..."}
      >
        <TextField.Slot />
        <TextField.Slot>
          <Button type="submit">{"Search"}</Button>
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
};
