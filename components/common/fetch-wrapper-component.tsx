import React from "react";

import ErrorView from "./error-view-component";
import LoadingViewComponent from "./loading-view-component";

import EmptyViewComponent from "./empty-view-component";
import { Text } from "../themed";

interface WrapperProps {
  isLoading?: boolean;
  error?: string | boolean | null;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  component: React.ReactNode;
  errorVertical?: boolean;
  onRetry?: () => void;
  emptyText?: string;
  showEmptyText?: boolean;
  showEmptyComponent?: boolean;
  empty?: boolean;

  noPadding?: boolean;
  loadingViewHeight?: number;
}

export default function FetchWrapperComponent(props: WrapperProps) {
  const {
    isLoading = false,
    error,
    onRetry,
    loadingComponent,
    component,
    errorComponent,
    emptyComponent,
    empty,
    emptyText,
    noPadding,
    loadingViewHeight,
  } = props;

  if (isLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }
    return (
      <LoadingViewComponent
        noPadding={noPadding}
        loadingViewHeight={loadingViewHeight}
      />
    );
  } else if (error) {
    if (errorComponent) {
      return <>{errorComponent}</>;
    }

    return (
      <ErrorView refetch={onRetry} error={error as any} noPadding={noPadding} />
    );
  } else if (empty) {
    if (emptyText) {
      return <Text>{emptyText}</Text>;
    } else if (emptyComponent) {
      return <>{emptyComponent}</>;
    }
    return <EmptyViewComponent refetch={onRetry} noPadding={noPadding} />;
  }

  return <>{component}</>;
}
