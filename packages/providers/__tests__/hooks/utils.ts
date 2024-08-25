import { useQuery } from "@tanstack/react-query";
import { Provider, useProvider } from "../../lib";

export type Dummy = {
  id: string;
  name: string;
};

export const dummyOne: Dummy = {
  id: "dummy1",
  name: "dummy1Name"
}

export const dummyTwo: Dummy = {
  id: "dummy2",
  name: "dummy2Name"
}

export const DUMMIES = [dummyOne, dummyTwo];

export const setupProviderMock = ({ toMock, response, mockImplementation }: { mockImplementation: jest.Mock, response: any, toMock: keyof Omit<Provider<any>, "resource"> }) => {
  (useProvider as jest.Mock).mockReturnValue({
    [toMock]: mockImplementation
  });

  (useQuery as jest.Mock).mockImplementation(({ queryFn }) => {
    // Test if queryFn was called with correct values (useQuery doesn't return a promise directly)
    queryFn();

    return {
      data: response,
    };
  });
}
