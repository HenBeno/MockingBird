import { useState } from 'react';
import { IconButton, InputBase, Menu, MenuItem, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import styles from './RightTopBar.module.css';

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onCenter: () => void;
  onClear: () => void;
  onFullScreen: () => void;
  showMaximize: boolean;
  showMinimize: boolean;
  showFullScreen: boolean;
  showClear: boolean;
  showSearch: boolean;
  showCenter: boolean;
  showExport?: boolean;
  onExportAll?: () => void;
  onExportSelected?: () => void;
  exportSelectedCount?: number;
};

export function RightTopBar({
  search,
  onSearchChange,
  onMinimize,
  onMaximize,
  onClear,
  onFullScreen,
  onCenter,
  showMaximize,
  showMinimize,
  showCenter,
  showFullScreen,
  showClear,
  showSearch,
  showExport,
  onExportAll,
  onExportSelected,
  exportSelectedCount = 0,
}: Props) {
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const exportMenuOpen = Boolean(exportAnchorEl);

  const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };
  const handleExportMenuClose = () => {
    setExportAnchorEl(null);
  };
  const handleExportAll = () => {
    onExportAll?.();
    handleExportMenuClose();
  };
  const handleExportSelected = () => {
    onExportSelected?.();
    handleExportMenuClose();
  };

  return (
    <div className={styles.endContainer}>
      {showSearch && (
        <div className={styles.inputWrapper}>
          <InputBase
            className={styles.input}
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
            value={search}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
        </div>
      )}

      {showExport && onExportAll && (
        <>
          <Tooltip title="Export">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleExportMenuOpen}
              aria-label="export"
              size="small"
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={exportAnchorEl}
            open={exportMenuOpen}
            onClose={handleExportMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleExportAll}>Export all</MenuItem>
            <MenuItem
              onClick={handleExportSelected}
              disabled={!exportSelectedCount}
            >
              Export selected
              {exportSelectedCount > 0 && ` (${exportSelectedCount})`}
            </MenuItem>
          </Menu>
        </>
      )}
      {showClear && (
        <Tooltip title="clear all">
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClear}
            aria-label="close"
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {showMinimize && (
        <Tooltip title="minimize">
          <IconButton
            edge="start"
            color="inherit"
            onClick={onMinimize}
            aria-label="close"
            size="small"
          >
            <KeyboardDoubleArrowDownIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {showCenter && (
        <Tooltip title="center">
          <IconButton
            edge="start"
            color="inherit"
            onClick={onCenter}
            aria-label="close"
            size="small"
          >
            <VerticalAlignCenterIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {showMaximize && (
        <Tooltip title="maximize">
          <IconButton
            edge="start"
            color="inherit"
            onClick={onMaximize}
            aria-label="close"
            size="small"
          >
            <KeyboardDoubleArrowUpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {showFullScreen && (
        <Tooltip title="full screen">
          <IconButton
            edge="start"
            color="inherit"
            onClick={onFullScreen}
            aria-label="close"
            size="small"
          >
            <FullscreenIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}
