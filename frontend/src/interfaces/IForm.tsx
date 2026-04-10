export interface Form {
  onConfirm: (title: string) => void;
  onCancel: () => void;
  initialValue?: string;
}