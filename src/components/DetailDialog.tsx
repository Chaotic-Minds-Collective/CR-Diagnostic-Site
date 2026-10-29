import React, { useEffect, useRef } from 'react';
import { FIELD_GUIDES, TROUBLE_CODES } from '../data/diagnosticsData';
import { DetailKind, DetailSelection } from '../types/diagnostics';

interface DetailDialogProps {
  selection: DetailSelection | null;
  onClose: () => void;
}

const DRAFT_DISCLAIMER =
  'Educational draft only. Procedures and specifications vary by year, make, model, engine, and market. Verify with authoritative service information and a qualified technician when appropriate.';

export const DetailDialog: React.FC<DetailDialogProps> = ({
  selection,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const selectedCode =
    selection?.kind === DetailKind.Code
      ? TROUBLE_CODES.find((c) => c.code === selection.id) ?? null
      : null;

  const selectedGuide =
    selection?.kind === DetailKind.Guide
      ? FIELD_GUIDES.find((g) => g.id === selection.id) ?? null
      : null;

  const isOpen = Boolean(selectedCode || selectedGuide);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        } else {
          dialog.setAttribute('open', '');
        }
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen, selection]);

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDialogElement>
  ) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  const eyebrowText = selectedCode
    ? `TROUBLE CODE // ${selectedCode.code}`
    : selectedGuide
    ? `FIELD GUIDE // ${selectedGuide.type}`
    : 'FIELD NOTE';

  return (
    <dialog
      ref={dialogRef}
      id="detailDialog"
      className="detail-dialog"
      aria-labelledby="dialogTitle"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className="dialog-head">
        <span id="dialogEyebrow" className="eyebrow">
          {eyebrowText}
        </span>
        <button
          type="button"
          id="closeDialog"
          className="dialog-close"
          aria-label="Close details"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div id="dialogContent">
        {selectedCode && (
          <>
            <h2 id="dialogTitle">{selectedCode.title}</h2>
            <p>{selectedCode.meaning}</p>
            <div className="warning-box">{selectedCode.warning}</div>

            <h3>Possible causes</h3>
            <ul>
              {selectedCode.causes.map((cause) => (
                <li key={cause}>{cause}</li>
              ))}
            </ul>

            <h3>Sensible next checks</h3>
            <ul>
              {selectedCode.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>

            <p>{DRAFT_DISCLAIMER}</p>
          </>
        )}

        {selectedGuide && (
          <>
            <h2 id="dialogTitle">{selectedGuide.title}</h2>
            <p>{selectedGuide.summary}</p>
            {selectedGuide.sections.map((section) => (
              <React.Fragment key={section.heading}>
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
              </React.Fragment>
            ))}
            <p>{DRAFT_DISCLAIMER}</p>
          </>
        )}
      </div>

      <div className="dialog-footer">
        <span>Draft content · qualified review pending</span>
        <button
          type="button"
          className="button button-ghost"
          id="closeDialogBottom"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </dialog>
  );
};
