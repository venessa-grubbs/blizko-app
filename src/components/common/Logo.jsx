import React from 'react'
import { Box } from '@mui/material'

function Logo({ size = 60, showText = true }) {
  const circleSize = size / 3
  const gap = size / 12
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {/* 3x3 Grid of Circles */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: `${gap}px`,
          width: `${size}px`,
          height: `${size}px`
        }}
      >
        {/* Row 1 */}
        <Box
          sx={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: '50%',
            border: `3px solid #FAF752`,
            backgroundColor: 'transparent'
          }}
        />
        <Box
          sx={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: '50%',
            border: `3px solid #FAF752`,
            backgroundColor: '#D9D9D9'
          }}
        />
        <Box
          sx={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: '50%',
            border: `3px solid #FAF752`,
            backgroundColor: 'transparent'
          }}
        />
        {/* Row 2 */}
        <Box
          sx={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: '50%',
            border: `3px solid #FAF752`,
            backgroundColor: '#D9D9D9'
          }}
        />
        <Box
          sx={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: '50%',
            border: `3px solid #FAF752`,
            backgroundColor: '#D9D9D9'
          }}
        />
        <Box
          sx={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: '50%',
            border: `3px solid #FAF752`,
            backgroundColor: 'transparent'
          }}
        />
        {/* Row 3 */}
        <Box
          sx={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: '50%',
            border: `3px solid #FAF752`,
            backgroundColor: 'transparent'
          }}
        />
        <Box
          sx={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: '50%',
            border: `3px solid #FAF752`,
            backgroundColor: '#D9D9D9'
          }}
        />
        <Box
          sx={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: '50%',
            border: `3px solid #FAF752`,
            backgroundColor: 'transparent'
          }}
        />
      </Box>
      
      {/* BLIZKO Text */}
      {showText && (
        <Box
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#FAF752',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.05em'
          }}
        >
          BLIZK
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '0.8em',
              height: '0.8em',
              borderRadius: '50%',
              border: '2px solid #FAF752',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '0.35em',
                height: '0.35em',
                backgroundColor: '#FAF752',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: 'rotate(45deg)'
              }
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default Logo

