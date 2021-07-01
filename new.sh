#!/usr/bin/env bash

echo "function $1() {
  return (
    <div className=\"$1\">
    
    </div>
  )
}

export default $1;" >> src/components/$1.js