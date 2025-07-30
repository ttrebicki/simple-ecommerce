import { Button, TextField } from "@radix-ui/themes";

export const SearchForm = () => {
  return (
    <form>
      <TextField.Root
        size={"3"}
        id="search"
        name="search"
        defaultValue={""}
        placeholder={"Znajdź produkt..."}
      >
        <TextField.Slot />
        <TextField.Slot>
          <Button type="submit" children={"Szukaj"} />
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
};
